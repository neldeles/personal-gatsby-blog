---
date: 2020-09-25T10:00:00Z
tags: ["django"]
title: "Test CSV Upload in Django with Logged In User"
published: true
description: 'How to solve the error `Cannot assign "<SimpleLazyObject: <django.contrib.auth.models.AnonymousUser object at 0x7ff1f6b868b0>>": "InputCsv.uploaded_by" must be a "CustomUser" instance.`'
---

The error above was popping up because `uploaded_by` is retrieved in the view via `self.request.user`. This means that when running my test, there needs to be a logged in user so that the `uploaded_by` field is populated.

To solve this, simply login your created test user via `self.client.login(username='foo', password='bar')`. The complete code looks something like this:

```py
#test.py
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

from .models import InputCsv

class AutoAvTests(TestCase):
  def setUp(self):
    self.csv = SimpleUploadedFile(
      "file.csv", b"file_content", content_type="text/csv"
    )

    self.user = get_user_model().objects.create_user(
      username="testuser",
      email="test@email.com",
      password="secret",
    )

    self.client.login(username="testuser", password="secret")

  def test_av_create(self):
    response = self.client.post(
        reverse("av_upload"),
        {
          "shipper_group": "lazada",
          "csv": self.csv,
              "attempted_for_processing": False,
        },
    )
    self.assertEqual(response.status_code, 302)
    self.assertEqual(InputCsv.objects.last().shipper_group, "lazada")
    self.assertEqual(InputCsv.objects.last().uploaded_by, self.user)
```
