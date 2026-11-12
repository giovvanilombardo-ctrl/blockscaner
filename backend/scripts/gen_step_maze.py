"""One-off: generate the pink 3D isometric maze background for the Step page hero."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/step-maze.png")

PROMPT = (
    "A premium 3D render background: an isometric abstract maze of glossy hot-pink geometric steps, "
    "blocks and winding channel paths, viewed from a 45-degree top-down angle. The blocks are vivid "
    "pink and magenta plastic with soft rounded edges, studio lighting, subtle reflections and soft "
    "shadows. The upper-left area of the image is a clean empty light warm-grey studio background "
    "(space for text), the pink maze occupies the bottom and right side. Minimalist, high-end fintech "
    "advertising style, octane render, no people, no phone, no text, no watermark. Landscape 3:2."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="step-maze",
                   system_message="You are a professional 3D artist.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
