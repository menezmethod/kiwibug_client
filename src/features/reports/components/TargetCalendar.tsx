import React, { useEffect, useState } from 'react';
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '@/utils/event';
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import { useIssues } from '@/features/issues/api/getIssues';
import dayjs from 'dayjs';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Paper } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // webpack uses file-loader to handle font files


import { Calendar } from '@fullcalendar/core';
import bootstrapPlugin from '@fullcalendar/bootstrap';

interface TargetCalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export default function TargeCalendar() {
  //   state: TargetCalendarState = {
  //     weekendsVisible: true,
  //     currentEvents: [],
  //   };
  const issuesQuery = useIssues();

  let issuesData = issuesQuery?.data;

  const [targetDateData, setTargetDateData] = useLocalStorage('target_data', []);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    setTargetDateData(
      issuesData?.map((a: any) => {
        return {
          id: a.issuesId,
          title: a.issueSummary,
          start: dayjs(a.targetResolutionDate).subtract(1, 'day').format('YYYY-MM-DD'),
        };
      })
    );
  }, [issuesData]);

  //   console.log(targetDateData);
  return (
    <Paper sx={{ padding: 4 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        themeSystem="bootstrap"
        initialView="dayGridMonth"
        editable={false}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        initialEvents={targetDateData} // alternatively, use the `events` setting to fetch from a feed
        // select={this.handleDateSelect}
        eventContent={renderEventContent} // custom render function
        // eventClick={this.handleEventClick}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
    </Paper>
  );

  //   handleWeekendsToggle = () => {
  //     this.setState({
  //       weekendsVisible: !this.state.weekendsVisible,
  //     });
  //   };

  //   handleDateSelect = (selectInfo: DateSelectArg) => {
  //     let title = prompt('Please enter a new title for your event');
  //     let calendarApi = selectInfo.view.calendar;

  //     calendarApi.unselect(); // clear date selection

  //     if (title) {
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //       });
  //     }
  //   };

  //   handleEventClick = (clickInfo: EventClickArg) => {
  //     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //       clickInfo.event.remove();
  //     }
  //   };

  //   handleEvents = (events: EventApi[]) => {
  //     this.setState({
  //       currentEvents: events,
  //     });
  //   };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}
