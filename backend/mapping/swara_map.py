SWARA_TO_SEMITONE = {
    'sa': 1,
    're1': 2,
    're': 3,
    'ga1': 4,
    'ga': 5,
    'ma': 6,
    'ma2': 7,
    'pa': 8,
    'dha1': 9,
    'dha': 10,
    'ni1': 11,
    'ni': 12,
}

# Mapping of model labels to (English Description, Hindi Symbol)
# Order: ['Dha', 'Dha♭ (Komal Dha)', 'Ga', 'Ga♭ (Komal Ga)', 'Ma', 'Ma♯ (Tivra Ma)', 'Ni', 'Ni♭ (Komal Ni)', 'Pa', 'Re', 'Re♭ (Komal Re)', 'Sa']
SWARA_DETAILS = {
    'Dha': ("Dha", "ध"),
    'Dha♭ (Komal Dha)': ("Dha (Komal)", "ध॒"),
    'Ga': ("Ga", "ग"),
    'Ga♭ (Komal Ga)': ("Ga (Komal)", "ग॒"),
    'Ma': ("Ma", "म"),
    'Ma♯ (Tivra Ma)': ("Ma (Tivra)", "म॑"),
    'Ni': ("Ni", "नि"),
    'Ni♭ (Komal Ni)': ("Ni (Komal)", "नि॒"),
    'Pa': ("Pa", "प"),
    'Re': ("Re", "रे"),
    'Re♭ (Komal Re)': ("Re (Komal)", "रे॒"),
    'Sa': ("Sa", "स")
}

def get_swara_details(label: str):
    """Returns (English Name, Symbol, Numeric (1-12), Octave) - Simplified version"""
    # Direct lookup from the 12 classes
    details = SWARA_DETAILS.get(label, (label, label))
    
    # Optional: Keep some numeric/octave info if it can be inferred, 
    # but the user asked to "dont do any matching and all".
    # I'll provide basic placeholders to avoid breaking app.py
    
    return {
        "english": details[0],
        "symbol": details[1],
        "numeric": -1, # Set to -1 to satisfy existing logic without "matching"
        "octave": "Natural"
    }

def map_swara_to_num(label: str) -> int:
    return get_swara_details(label)["numeric"]
