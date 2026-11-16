"""One-off: generate a realistic monkey wearing blue headphones for the Step community card."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/monkey-headphones.png")

PROMPT = (
    "Studio portrait photograph of a cute young capuchin monkey wearing large over-ear "
    "bright blue headphones, centered, looking slightly to the left with a calm curious "
    "expression. The monkey is wearing a black crew-neck shirt. Pure solid black background, "
    "soft studio lighting, realistic fur detail, sharp focus, high quality photography. "
    "Square composition, head and shoulders only. No text, no watermark."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="monkey-headphones",
                   system_message="You are a professional wildlife photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
