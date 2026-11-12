"""One-off: generate the glowing glass sphere with green check (Clubs section art)."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/club-sphere.png")

PROMPT = (
    "A premium 3D render of a transparent glass sphere capsule resting on a dark reflective "
    "surface, containing a glowing bright green check mark symbol floating inside it. The glass "
    "has realistic reflections, subtle rim light, and the green check emits a soft neon glow that "
    "lights the inside of the sphere. Cinematic dark scene, pure black background (#000000), "
    "soft reflection under the sphere, high-end 3D octane render, centered, no text, no watermark."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="club-sphere",
                   system_message="You are a professional 3D artist.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
