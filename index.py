from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def get_font_size(element):
    style = element.get("style", "")
    style_parts = style.split(";")
    for part in style_parts:
        if "font-size" in part:
            size_parts = part.split(":")
            if len(size_parts) == 2:
                return float(size_parts[1].strip().replace("px", "").replace("pt", ""))
    return None

def score_element(element, max_index, max_font_size, index):
    """
    Score an element based on its position, type, and font size.
    
    Args:
        element (Tag): The BeautifulSoup Tag representing the HTML element.
        max_index (int): The maximum index (position) of an element in the list.
        max_font_size (float): The maximum font size found among elements.

    Returns:
        float: The score for the element, where higher scores indicate a higher probability of being the hero header.
    """
    element_type = element.name
    font_size = get_font_size(element)

    # Weight factors for scoring (you can adjust these as needed)
    position_weight = 1.0  # Weight for element position (higher is more important)
    type_weight = 0.5  # Weight for element type (higher is more important)
    font_size_weight = 0.3  # Weight for font size (higher is more important)

    # Calculate scores for position, type, and font size
    position_score = 1.0 - (index / max_index)  # Higher position means lower score
    type_score = 1.0 if element_type in ["h1", "h2", "h3"] else 0.0  # Headers get higher score
    font_size_score = font_size / max_font_size if font_size is not None else 0.0

    # Calculate the final score by combining weighted scores
    final_score = (
        (position_weight * position_score)
        + (type_weight * type_score)
        + (font_size_weight * font_size_score)
    )

    return final_score

@app.route('/best-element', methods=['GET'])
def best_element():
    url = request.args.get('url')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    elements = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p"])

    max_index = len(elements) - 1
    max_font_size = max(get_font_size(element) or 0.0 for element in elements)

    highest_score = None
    best_element = None
    best_selector = None

    index_elements = {
        "h1": 0,
        "h2": 0,
        "h3": 0,
        "h4": 0,
        "h5": 0,
        "h6": 0,
        "p": 0,
    }

    for index, element in enumerate(elements):
        element_score = score_element(element, max_index, max_font_size, index)
        
        if highest_score is None or element_score > highest_score:
            highest_score = element_score
            best_element = element
            best_selector = (best_element.name, best_element.attrs, best_element.text, index_elements[best_element.name])
        index_elements[element.name] += 1

    if best_element is not None:
        return jsonify({
            "score": highest_score,
            "selector": best_selector,
            "text": best_element.text.strip()
        })
    else:
        return jsonify({"error": "No elements found."})

if __name__ == '__main__':
    app.run(debug=True)