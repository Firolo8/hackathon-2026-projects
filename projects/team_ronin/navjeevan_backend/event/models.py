from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _

from user import *

class Event (models.Model):
    class EventStatus(models.TextChoices):
        NOT_STARTED = 'NOT_STARTED', _('NOT_STARTED')
        IN_PROGRESS = 'IN_PROGRESS', _('IN_PROGRESS')
        ENDED = 'ENDED', _('ENDED')
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
        )
    
    name = models.CharField(
        max_length=40,
        verbose_name=_('Name of the Event')
    )

    event_status = models.CharField(
        choices=EventStatus.choices,
        default=EventStatus.NOT_STARTED,
        verbose_name=_('Event Status')
    )

    description = models.TextField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name=_('Event Description')
    )

    created_at = models.DateTimeField(auto_now_add=True)
    udpated_at = models.DateTimeField(auto_now=True)

    # created_by = models.ForeignKey(
    #     Medical
    # )

    # registered_vaccine

    # assigned_medical_personal

    # region

    # contact

    # user

    class Meta:
        verbrose_name = _('Event')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    




