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
    """Returns (English Name, Symbol, Numeric (1-12), Octave) with ultra-robust lookup."""
    label = str(label)
    
    # 1. Direct Lookup (Exact)
    details = SWARA_DETAILS.get(label)
    
    # 2. Robust lookup (Case-insensitive, Prefix matching, Suffix stripping)
    if not details:
        label_clean = label.split('(')[0].strip().lower() # 'Sa(dot)' -> 'sa'
        label_lower = label.lower()
        
        # Priority 1: Case-insensitive match on full label
        for key, val in SWARA_DETAILS.items():
            if key.lower() == label_lower:
                details = val
                break
        
        # Priority 2: Match on clean prefix (e.g., 'Sa' from 'Sa(no dot)')
        if not details:
            for key, val in SWARA_DETAILS.items():
                key_clean = key.split('(')[0].strip().lower()
                if key_clean == label_clean:
                    details = val
                    break
                    
    # 3. Fallback to basic swara identification if still not found
    if not details:
        base_swaras = ['sa', 're', 'ga', 'ma', 'pa', 'dha', 'ni']
        label_lower = label.lower()
        for base in base_swaras:
            if base in label_lower:
                # Find the first matching base swara details
                # Check for Komal/Tivra keywords
                is_komal = 'komal' in label_lower or '♭' in label_lower or '_' in label_lower
                is_tivra = 'tivra' in label_lower or '♯' in label_lower or 'm2' in label_clean or 'ma2' in label_clean
                
                for key, val in SWARA_DETAILS.items():
                    k_lower = key.lower()
                    if k_lower.startswith(base):
                        if is_komal and ('komal' in k_lower or '♭' in k_lower):
                            details = val
                            break
                        if is_tivra and ('tivra' in k_lower or '♯' in k_lower):
                            details = val
                            break
                        if not is_komal and not is_tivra and 'komal' not in k_lower and 'tivra' not in k_lower and '♭' not in k_lower and '♯' not in k_lower:
                            details = val
                            break
                if not details: # Default to base if specialized version not found
                    for key, val in SWARA_DETAILS.items():
                        if key.lower().startswith(base):
                            details = val
                            break
                if details: break
                
    if not details:
        details = (label, label)
    
    # Optional mapping for numeric values based on clean label
    label_clean = label.split('(')[0].strip().lower()
    numeric = SWARA_TO_SEMITONE.get(label_clean, -1)
    if numeric == -1: # Try base lookup
        for base, num in SWARA_TO_SEMITONE.items():
            if base in label_clean:
                numeric = num
                break
    
    return {
        "english": details[0],
        "symbol": details[1],
        "numeric": numeric,
        "octave": "Natural" # Default
    }

def map_swara_to_num(label: str) -> int:
    return get_swara_details(label)["numeric"]
