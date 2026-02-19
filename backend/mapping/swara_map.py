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
SWARA_DETAILS = {
    "Dha(dot above)": ("Dha (Dot Above)", "ध̇"),
    "Dha(dot below)": ("Dha (Dot Below)", "ध̣"),
    "Dha(no dot)": ("Dha (No Dot)", "ध"),
    "Ga(dot above)": ("Ga (Dot Above)", "ग̇"),
    "Ga(dot below)": ("Ga (Dot Below)", "ग̣"),
    "Ga(no dot)": ("Ga (No Dot)", "ग"),
    "Ga1(dot above)": ("Ga (Komal, Dot Above)", "ग॒̇"),
    "Handwriting": ("Handwriting", "✍"),
    "Ma(dot above)": ("Ma (Dot Above)", "म̇"),
    "Ma(no dot)": ("Ma (No Dot)", "म"),
    "Ma2(dot above)": ("Ma (Teevra, Dot Above)", "म॑̇"),
    "Ma2(dot below)": ("Ma (Teevra, Dot Below)", "म̣॑"),
    "Ma2(no dot)": ("Ma (Teevra, No Dot)", "म॑"),
    "Ni(dot below)": ("Ni (Dot Below)", "नि̣"),
    "Ni(no dot)": ("Ni (No Dot)", "नि"),
    "Ni1(dot below)": ("Ni (Komal, Dot Below)", "नि॒̣"),
    "Ni1(no dot)": ("Ni (Komal, No Dot)", "नि॒"),
    "Pa(dot above)": ("Pa (Dot Above)", "प̇"),
    "Pa(dot below)": ("Pa (Dot Below)", "प̣"),
    "Pa(no dot)": ("Pa (No Dot)", "प"),
    "Re(dot above)": ("Re (Dot Above)", "रे̇"),
    "Re(no dot)": ("Re (No Dot)", "रे"),
    "Re1(dot above)": ("Re (Komal, Dot Above)", "रे॒̇"),
    "Re1(no dot)": ("Re (Komal, No Dot)", "रे॒"),
    "Sa(dot above)": ("Sa (Dot Above)", "स̇"),
    "Sa(no dot)": ("Sa (No Dot)", "स"),
}

def get_swara_details(label: str):
    """Returns (English Name, Symbol, Numeric (1-12), Octave)"""
    details = SWARA_DETAILS.get(label, (label, label))
    
    # Extract base note (e.g., 'Sa', 'Re1', 'Ma2')
    import re
    # We want to keep the digit if it's 1 or 2 as part of the base note name for semitone lookup
    match = re.match(r'^([A-Za-z]+[12]?)', label)
    if match:
        base_label = match.group(1).lower()
    else:
        base_label = label.lower()
        
    num = SWARA_TO_SEMITONE.get(base_label, -1)
    
    # 🔹 OCTAVE LOGIC 
    octave = "Middle"
    if "(dot above)" in label:
        octave = "Upper"
    elif "(dot below)" in label:
        octave = "Lower"
    
    # Handle noise/handwriting
    if num == -1:
        octave = None

    return {
        "english": details[0],
        "symbol": details[1],
        "numeric": num,
        "octave": octave
    }

def map_swara_to_num(label: str) -> int:
    return get_swara_details(label)["numeric"]
