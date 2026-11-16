"""One-off: generate the moneybox interior lifestyle photo for the home planning section."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/moneybox-home.png")

PROMPT = (
    "Bright minimalist interior photograph: warm morning sunlight streaming across a light "
    "beige wall with soft leaf shadows, a terracotta-orange armchair on the left, an olive plant "
    "in a terracotta pot on the right, polished concrete floor. On the floor in the foreground: "
    "a set of house keys and a small bright green card. Airy, calm, premium real-estate editorial "
    "photography, natural light, soft shadows, no people, no text. Landscape orientation."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="moneybox-home",
                   system_message="You are a professional interior photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
