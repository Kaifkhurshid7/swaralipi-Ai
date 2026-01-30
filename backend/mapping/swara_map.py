SWARA_TO_NUM = {
    'Sa': 1,
    'Re': 2,
    'Ga': 3,
    'Ma': 4,
    'Pa': 5,
    'Dha': 6,
    'Ni': 7,
    # common lowercase / alternate labels
    'sa': 1,
    're': 2,
    'ga': 3,
    'ma': 4,
    'pa': 5,
    'dha': 6,
    'ni': 7,
}

def map_swara_to_num(label: str) -> int:
    return SWARA_TO_NUM.get(label, -1)
