import React from "react";
import { DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EventForm = ({ date, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name: e.target["event-name"].value,
      startTime: e.target["event-start-time"].value,
      endTime: e.target["event-end-time"].value,
      description: e.target["event-description"].value,
      date,
    };

    if (!eventData.startTime || !eventData.endTime || !eventData.name) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit(eventData); // Pass the event data to the parent
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Event for {date ? date.toLocaleDateString() : "Selected Day"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="event-name">Event Name</Label>
            <Input
              id="event-name"
              name="event-name"
              placeholder="Enter event name"
              required
            />
          </div>
          <div>
            <Label htmlFor="event-start-time">Event Start Time</Label>
            <Input
              type="time"
              id="event-start-time"
              name="event-start-time"
              required
            />
          </div>
          <div>
            <Label htmlFor="event-end-time">Event End Time</Label>
            <Input
              type="time"
              id="event-end-time"
              name="event-end-time"
              required
            />
          </div>
          <div>
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              name="event-description"
              placeholder="Enter event description"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Event
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default EventForm;
