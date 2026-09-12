"""
Feature Engineering for RoadSafe ML Engine (BOB Prompt 13 Specification)
Extracts historical crash frequency, fatality ratios, night hours crash share, and road type weights.
"""

from typing import List, Dict, Any

def extract_location_features(accidents: List[Dict[str, Any]], location_info: Dict[str, Any]) -> List[float]:
    total = len(accidents) if accidents else 1
    fatalities = sum(a.get("fatalities", 0) for a in accidents) if accidents else 0
    injuries = sum(a.get("injuries", 0) for a in accidents) if accidents else 0

    fatality_ratio = fatalities / max(1, total)
    injury_ratio = injuries / max(1, total)

    overspeed_share = sum(1 for a in accidents if "Speed" in a.get("cause", "")) / total if accidents else 0.4
    fog_share = sum(1 for a in accidents if "Fog" in a.get("cause", "") or "Visibility" in a.get("cause", "")) / total if accidents else 0.2

    road_weight = 1.0
    road_type = location_info.get("road_type", "")
    if "Expressway" in road_type:
        road_weight = 1.4
    elif "National Highway" in road_type:
        road_weight = 1.25

    return [
        float(total),
        float(fatalities),
        float(injuries),
        float(fatality_ratio),
        float(injury_ratio),
        float(overspeed_share),
        float(fog_share),
        float(road_weight),
    ]
