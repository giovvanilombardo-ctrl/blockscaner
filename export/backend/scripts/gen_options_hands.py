"""One-off: generate the Options hero illustration — two hands holding PUT/CALL documents."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/options-hands.png")

PROMPT = (
    "Flat vector illustration in a modern fintech editorial style on a pure solid black background: "
    "two realistic stylised hands entering from the left and right edges of the frame, each holding a "
    "white paper document. The left document is titled 'PUT' in bold blue letters at the top, with "
    "four horizontal blue lines below it and a blue rounded square with a white checkmark at the "
    "bottom-right corner. The right document is titled 'CALL' in bold blue letters at the top, with "
    "four horizontal blue lines below it and a blue rounded square with a white checkmark at the "
    "bottom-left corner. The hands have realistic proportions, knuckles and fingernails, drawn in a "
    "clean flat vector style with simple shading; the sleeves are bright sky blue. The documents have "
    "soft drop shadows. Accent color: vivid blue #2f7fe8 on black. No text other than PUT and CALL, "
    "no watermark, no border. Landscape 16:10 composition, centered."
)

MODEL = "gemini-3-pro-image-preview"


async def main():
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id="options-hands",
                   system_message="You are a professional editorial illustrator.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        OUT.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {OUT} ({OUT.stat().st_size} bytes)")
    else:
        print(f"EMPTY: {str(text)[:200]}")


asyncio.run(main())
