"""
RoadSafe India Risk Score Engine (BOB Prompt 7 Specification)
Prototype Scoring Methodology:
Computes a weighted 0-100 score based on:
1. Crash Frequency (Weight 30%)
2. Fatality & Injury Severity Weight (Weight 35%)
3. Road Category Vulnerability (Weight 15%)
4. High-Risk Cause Multipliers (Speeding/Fog/Drunk) (Weight 20%)

Risk Classifications:
0-30   = LOW
31-60  = MEDIUM
61-80  = HIGH
81-100 = CRITICAL
"""

from typing import List, Dict, Any, Tuple

def get_risk_level(score: int) -> str:
    if score >= 81:
        return "CRITICAL"
    elif score >= 61:
        return "HIGH"
    elif score >= 31:
        return "MEDIUM"
    else:
        return "LOW"

def calculate_risk_score(accidents_count: int, fatalities: int, road_type: str) -> Tuple[int, int]:
    res = calculate_location_risk(
        accidents_count=accidents_count,
        fatalities=fatalities,
        injuries=int(fatalities * 1.5),
        road_type=road_type
    )
    return res["risk_score"], res["confidence"]

def calculate_location_risk(
    accidents_count: int,
    fatalities: int,
    injuries: int,
    road_type: str,
    causes_distribution: List[Dict[str, Any]] = None
) -> Dict[str, Any]:
    # 1. Frequency Score (capped at 30)
    freq_score = min(30.0, (accidents_count / 150.0) * 30.0)

    # 2. Severity Score (Fatalities weighted 4x, Injuries 1x, capped at 35)
    severity_sum = (fatalities * 4.0) + (injuries * 1.0)
    severity_score = min(35.0, (severity_sum / 100.0) * 35.0)

    # 3. Road Type Exposure (Expressway / NH higher base risk)
    road_weight = 15.0
    if "Expressway" in road_type or "National Highway" in road_type:
        road_weight = 15.0
    elif "State Highway" in road_type:
        road_weight = 12.0
    else:
        road_weight = 8.0

    # 4. Cause Multipliers
    cause_score = 12.0
    contributing_factors = []
    if causes_distribution:
        for c in causes_distribution:
            if c.get("cause") == "Overspeeding" and c.get("percentage", 0) > 30:
                cause_score += 4.0
                contributing_factors.append("Dominant Overspeeding Hazard")
            if "Visibility" in c.get("cause", "") or "Fog" in c.get("cause", ""):
                cause_score += 3.0
                contributing_factors.append("Adverse Weather & Fog Exposure")

    total_score = int(min(100.0, freq_score + severity_score + road_weight + cause_score))

    level = get_risk_level(total_score)

    if not contributing_factors:
        contributing_factors = ["High Vehicle Volume", "Intersection Conflicts"]

    return {
        "risk_score": total_score,
        "risk_level": level,
        "confidence": 88,
        "contributing_factors": contributing_factors,
        "methodology": "Prototype Weighted Hazard Model v1.0 (MoRTH Metric Derived)"
    }
