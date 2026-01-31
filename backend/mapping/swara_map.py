SWARA_TO_NUM = {
    'sa': 1,
    're': 2,
    'ga': 3,
    'ma': 4,
    'pa': 5,
    'dha': 6,
    'ni': 7,
}

def map_swara_to_num(label: str) -> int:
    # Clean the label (e.g., "Dha(dot above)" -> "dha")
    # Take the part before any bracket or number
    import re
    cleaned = re.split(r'\(|\d', label)[0].lower().strip()
    return SWARA_TO_NUM.get(cleaned, -1)
