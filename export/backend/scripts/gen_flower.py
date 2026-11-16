"""One-off: generate a 3D glass blue flower sculpture (DeFi card art) via Gemini image gen."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/defi-flower.png")

PROMPT = (
    "A beautiful abstract 3D sculpture of a flower made of translucent blue glass petals, "
    "viewed from directly above (top-down view). 6-7 elongated rounded petals arranged in a radial "
    "rosette around a glowing blue glass center. The glass has realistic refraction, internal blue "
    "gradient from light cyan edges to deep sapphire core, subtle iridescent highlights, glossy "
    "specular reflections, soft inner glow. Premium octane-render 3D look, soft studio lighting, "
    "gentle ambient occlusion between the petals, faint soft shadow beneath. "
    "Isolated on a pure solid black background (hex #000000), nothing else in frame, no text, "
    "no watermark. Centered composition with generous margin around the flower."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="defi-flower",
                   system_message="You are a professional 3D artist.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
