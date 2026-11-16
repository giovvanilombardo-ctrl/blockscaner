"""One-off: generate Pro page card art (trader photo + 3D membership medals)."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT_DIR = Path("/app/frontend/src/assets/pro")
OUT_DIR.mkdir(parents=True, exist_ok=True)

MODEL = "gemini-3-pro-image-preview"

IMAGES = [
    ("staking-phone", "3D render on a dark green gradient background: a white smartphone mockup tilted at a slight angle showing a crypto staking app with a green percentage badge at the top, floating white coins with blue Ethereum logos around it, small orange flame icons near the bottom, premium fintech style, clean and modern, no text, landscape composition"),
    ("support-meeting", "photograph of two professionals in a modern office: a woman with short dark hair and a man with glasses and greying hair, both smiling and looking at a laptop on a wooden desk, warm natural lighting, shallow depth of field, photorealistic, landscape composition, no text, no watermark"),
]


async def gen(name: str, prompt: str):
    out = OUT_DIR / f"{name}.png"
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id=f"pro-{name}",
                   system_message="You are a professional commercial photographer and 3D artist.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        out.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {out} ({out.stat().st_size} bytes)", flush=True)
    else:
        print(f"EMPTY {name}: {str(text)[:160]}", flush=True)


async def main():
    for name, prompt in IMAGES:
        await gen(name, prompt)


asyncio.run(main())
