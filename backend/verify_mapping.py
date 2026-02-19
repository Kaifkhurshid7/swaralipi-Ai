import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from mapping.swara_map import get_swara_details

test_cases = [
    ("Sa(no dot)", 1, "Middle"),
    ("Sa(dot above)", 1, "Upper"),
    ("Re1(no dot)", 2, "Middle"),
    ("Re(no dot)", 3, "Middle"),
    ("Ga1(dot above)", 4, "Upper"),
    ("Ga(no dot)", 5, "Middle"),
    ("Ma(no dot)", 6, "Middle"),
    ("Ma2(dot below)", 7, "Lower"),
    ("Pa(dot below)", 8, "Lower"),
    ("Dha(no dot)", 10, "Middle"),
    ("Ni1(dot below)", 11, "Lower"),
    ("Ni(no dot)", 12, "Middle"),
    ("Handwriting", -1, None),
]

def verify():
    print("Starting Swara Mapping Verification...\n")
    success_count = 0
    for label, expected_num, expected_octave in test_cases:
        result = get_swara_details(label)
        numeric = result['numeric']
        octave = result['octave']
        
        status = "✅ PASS" if numeric == expected_num and octave == expected_octave else "❌ FAIL"
        if status == "❌ FAIL":
            print(f"{status} | Label: {label:15} | Expected: ({expected_num}, {expected_octave}) | Got: ({numeric}, {octave})")
        else:
            print(f"{status} | Label: {label:15} | Result: ({numeric}, {octave})")
            success_count += 1
            
    print(f"\nVerification Complete: {success_count}/{len(test_cases)} passed.")
    if success_count == len(test_cases):
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    verify()
