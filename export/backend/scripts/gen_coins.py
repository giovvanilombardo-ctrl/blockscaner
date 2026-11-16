"""One-off: generate photorealistic coin images for the Business hero via Gemini image gen."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/src/assets/coins")
OUT.mkdir(parents=True, exist_ok=True)

STYLE = (
    "Ultra-photorealistic premium physical collectible coin, photographed with a high-end macro "
    "camera in a professional studio. Solid silver-white metal with visible thickness and weight, "
    "precisely machined reeded outer edge with fine ridges and bevels, deeply embossed relief with "
    "realistic depth, subtle natural imperfections and variations in the metal. Directional key "
    "light from the top-left creating realistic metallic highlights and light gradients, soft "
    "secondary light revealing the engraved details, natural ambient occlusion in recessed areas, "
    "subtle reflections along the bevels, realistic soft cast shadow beneath the coin. "
    "The coin lies flat on a seamless matte pure black studio surface (hex #0b0b0d), photographed "
    "from above at a {angle}-degree angle so the coin appears as a {shape}. "
    "Balanced contrast, no overexposure, 8K sharp macro detail, luxury product photography. "
    "Not a vector graphic, not cartoon, not plastic, not CGI-looking - indistinguishable from a "
    "real photograph of a physical metal coin. Pure black background only, no text, no watermark."
)

COINS = [
    ("bitcoin", "a large embossed Bitcoin 'B' symbol with two vertical strokes, colored in vivid orange", 50),
    ("ethereum", "the embossed Ethereum octahedron diamond logo, colored in blue-violet", 62),
    ("tether", "the embossed Tether 'T' symbol with a circle, colored in teal green", 60),
    ("usd-coin", "an embossed US dollar '$' sign inside a circle, colored in bright blue", 68),
    ("ripple", "the embossed XRP 'X' symbol, colored in dark grey", 60),
    ("polkadot", "the embossed Polkadot logo of a circle of small dots, colored in pink magenta", 58),
    ("euro", "a large embossed Euro currency symbol, colored in royal blue", 66),
]

MODEL = "gemini-3-pro-image-preview"


async def gen_one(cid: str, logo: str, angle: int) -> None:
    out = OUT / f"{cid}.png"
    shape = "slightly flattened ellipse" if angle <= 55 else "wide flat ellipse"
    prompt = STYLE.format(angle=angle, shape=shape) + f" At the center of the coin: {logo}."
    print(f"generating {cid}...", flush=True)
    try:
        chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id=f"coin-{cid}",
                       system_message="You are a professional product photographer.")
        chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
        text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        if images:
            out.write_bytes(base64.b64decode(images[0]["data"]))
            print(f"saved {out} ({out.stat().st_size} bytes)", flush=True)
        else:
            print(f"EMPTY result for {cid}: {str(text)[:120]}", flush=True)
    except Exception as e:
        print(f"FAILED {cid}: {str(e)[:300]}", flush=True)


async def main():
    for cid, logo, angle in COINS:
        await gen_one(cid, logo, angle)
    print("ALL DONE", flush=True)


asyncio.run(main())
