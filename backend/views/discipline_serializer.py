from typing import Dict


def discipline_serializer(discipline: Dict) -> Dict:
    discipline["discipline_id"] = str(discipline.pop("_id"))
    return discipline
