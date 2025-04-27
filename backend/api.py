import base64
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()

def generate(prompt: str):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
            ],
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=genai.types.Schema(
            type=genai.types.Type.OBJECT,
            properties={
                "Country": genai.types.Schema(type=genai.types.Type.STRING),
                "GDP": genai.types.Schema(type=genai.types.Type.NUMBER),
                "Disaster Spending": genai.types.Schema(type=genai.types.Type.STRING),
                "Percentage of GDP used on disaster spending": genai.types.Schema(type=genai.types.Type.NUMBER),
                "Dominant Pollutants": genai.types.Schema(type=genai.types.Type.STRING),
                "Recap of pollutants": genai.types.Schema(type=genai.types.Type.STRING),
                "Solution Suggestion": genai.types.Schema(type=genai.types.Type.STRING),
                "Source": genai.types.Schema(type=genai.types.Type.STRING),
            },
        ),
    )

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )

    print(response.text)  # ✅ If response has .text
    # Otherwise print the full response if you want to inspect it
    # print(response)


if __name__ == "__main__":
    generate(
        "Generate a report on the impact of climate change on the economy of a country. Include the following information:\n1. Country name\n2. GDP\n3. Disaster spending\n4. Percentage of GDP used on disaster spending\n5. Dominant pollutants in the air\n6. Recap of pollutants\n7. Solution suggestion\n8. Source"
    )
