"""Validated inputs; roles are always assigned by the server."""
import re
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class Input(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("*", mode="before")
    @classmethod
    def clean(cls, value):
        if isinstance(value, str):
            return re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", re.sub(r"<[^>]*>", "", value)).strip()
        return value


class Guest(Input):
    display_name: str = Field(min_length=1, max_length=60)


class CreateRoom(Input):
    title: str = Field(min_length=1, max_length=120)
    description: str = Field(default="", max_length=1000)
    topic: str = Field(default="General", min_length=1, max_length=80)
    visibility: Literal["public", "private"] = "public"
    max_participants: int = Field(default=100, ge=2, le=100)
    max_speakers: int = Field(default=8, ge=1, le=8)

    @model_validator(mode="after")
    def limits(self):
        if self.max_speakers > self.max_participants:
            raise ValueError("Speaker limit must not exceed participant limit.")
        return self


class JoinRoom(Input):
    invite: str = Field(default="", max_length=128)


class ChatMessage(Input):
    content: str = Field(min_length=1, max_length=2000)


class ModeratorChange(Input):
    enabled: bool
