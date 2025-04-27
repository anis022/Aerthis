import base64
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()

def generate_pop_up_response(prompt: str):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    formatted_prompt = f"""
    Based on this location: {prompt}
    
    Generate a complete response with ALL of the following required information:
    1. Country name - Required
    2. GDP (in USD) - Required numerical value
    3. Annual disaster spending - Required value
    4. Percentage of GDP used on disaster spending - Required percentage
    5. List the dominant air pollutants - Required list
    6. Provide a brief recap of pollution status - Required summary
    7. Specific solution suggestions - Required actionable items
    
    Format as JSON with ALL fields populated. If exact data is not available, provide reasonable estimates based on regional data.
    """

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                # types.Part.from_text(text=f"{prompt} take this data about the country and generate a pop up response:\n1. Country name\n2. GDP\n3. Disaster spending\n4. Percentage of GDP used on disaster spending\n5. Dominant pollutants in the air\n6. Recap of pollutants\n7. Solution suggestion"),
                types.Part.from_text(text=formatted_prompt),
            ],
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=genai.types.Schema(
            type=genai.types.Type.OBJECT,
            required=["Country", "GDP", "Disaster Spending", "Percentage of GDP used on disaster spending", "Dominant Pollutants", "Recap of pollutants", "Solution Suggestion"],
            properties={
                "Country": genai.types.Schema(type=genai.types.Type.STRING),
                "GDP": genai.types.Schema(type=genai.types.Type.NUMBER),
                "Disaster Spending": genai.types.Schema(type=genai.types.Type.STRING),
                "Percentage of GDP used on disaster spending": genai.types.Schema(type=genai.types.Type.STRING),
                "Dominant Pollutants": genai.types.Schema(type=genai.types.Type.STRING),
                "Recap of pollution": genai.types.Schema(type=genai.types.Type.STRING),
                "Solution Suggestion": genai.types.Schema(type=genai.types.Type.STRING),
            },
        ),
    )

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )

    print(response.text)
    return response.text  # ✅ If response has .text
    # Otherwise print the full response if you want to inspect it
    # print(response)

def generate_coordinates_response(prompt: str):
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
                "lat": genai.types.Schema(type=genai.types.Type.NUMBER),
                "lng": genai.types.Schema(type=genai.types.Type.NUMBER),
            },
        ),
    )
    
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )
    
    return response.text  # ✅ If response has .text

if __name__ == "__main__":
    generate(
        "Generate a report on the impact of climate change on the economy of a country. Include the following information:\n1. Country name\n2. GDP\n3. Disaster spending\n4. Percentage of GDP used on disaster spending\n5. Dominant pollutants in the air\n6. Recap of pollutants\n7. Solution suggestion\n8. Source"
    )
