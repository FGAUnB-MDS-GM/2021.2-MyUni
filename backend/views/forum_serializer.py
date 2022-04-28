from typing import Dict


def forum_serializer(forum: Dict) -> Dict:
    forum["forum_id"] = str(forum.pop("_id"))
    forum.get("comments").reverse()
    return forum
