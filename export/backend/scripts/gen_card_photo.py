"""One-off: generate the payment-card lifestyle photo for the home card section."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/card-swipe.png")

PROMPT = (
    "Editorial lifestyle photograph: a person's hand elegantly pulling a bright vivid green "
    "premium payment card out of a brown leather bifold wallet, resting on a grey stone cafe table. "
    "Warm natural daylight, shallow depth of field, cozy blurred cafe interior in the background. "
    "The card is plain matte bright green with a small contactless symbol, no readable text or logos. "
    "Photorealistic, high-end fintech advertising photography, 4K detail, natural skin tones, "
    "soft shadows. Landscape orientation."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="card-photo",
                   system_message="You are a professional advertising photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
