SWARA_TO_NUM = {
    'sa': 1,
    're': 2,
    'ga': 3,
    'ma': 4,
    'pa': 5,
    'dha': 6,
    'ni': 7,
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
    """Returns (English Name, Symbol, Numeric)"""
    details = SWARA_DETAILS.get(label, (label, label))
    
    # Extract numeric value for sequence
    import re
    base_label = re.split(r'\(|\d', label)[0].lower().strip()
    num = SWARA_TO_NUM.get(base_label, -1)
    
    # 🔹 OCTAVE MODIFICATION LOGIC 
    # Ignore -1 (Handwriting/Noise)
    if num != -1:
        if "(dot above)" in label:
            num += 10 # Taar Saptak
        elif "(dot below)" in label:
            num -= 10 # Mandra Saptak
            # Note: We use -10 offset rather than -7 to keep math simple and distinct
    
    return {
        "english": details[0],
        "symbol": details[1],
        "numeric": num
    }

def map_swara_to_num(label: str) -> int:
    return get_swara_details(label)["numeric"]
