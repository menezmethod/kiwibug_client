import { useIssues } from '@/features/issues/api/getIssues';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import useLocalStorage from '@/hooks/useLocalStorage';
import '@fortawesome/fontawesome-free/css/all.css'; // webpack uses file-loader to handle font files
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '@fullcalendar/common/main.min.css';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/daygrid/main.min.css';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Paper } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

export default function TargeCalendar() {
  const issuesQuery = useIssues();

  let issuesData = issuesQuery?.data;

  const [targetDateData, setTargetDateData] = useLocalStorage('target_data', []);

  useEffect(() => {
    if (issuesData) {
      setTargetDateData(
        issuesData?.map((a: any) => {
          return {
            id: a.issuesId,
            title: a.issueSummary,
            start: dayjs(a.targetResolutionDate).subtract(1, 'day').format('YYYY-MM-DD'),
          };
        })
      );
    }
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
