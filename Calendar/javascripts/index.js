document.addEventListener('DOMContentLoaded', () => {
  let calEvent;
  let isNewEvent = true;

  const closePreviewModalButton = document.getElementById('closePreviewModalButton');
  const editPreviewModalButton = document.getElementById('editPreviewModalButton');
  const deletePreviewModalButton = document.getElementById('deletePreviewModalButton');
  const eventPreviewModal = document.getElementById('eventPreviewModal');

  const deleteEventModalButton = document.getElementById('deleteEventModalButton');
  const saveEventModalButton = document.getElementById('saveEventModalButton');
  const closeEventModalButton = document.getElementById('closeEventModalButton');
  const addEditEventModal = document.getElementById('addEditEventModal');

  const calenderEvents = [
    {
      title: 'Demo',
      start: '2023-12-15T19:30',
      end: '2023-12-15T20:30',
      fileTitle: 'Drag and drop file for calendar',
      fileContent:
        'DevToys is a highly efficient tool to make the process of viewing files information simpler and easier.\n\nIt simplifies the task of searching and comparing content in your files when it enables drag-and-drop functionality.',
      color: '#FFA500',
      id: '1',
    },
    {
      title: ' 11am Workshop',
      start: '2023-01-25T19:30',
      end: '2023-01-25T20:30',
      fileTitle: 'generative AI',
      fileContent:
        'Generative AI has a wide range of applications, and its capabilities continue to expand, making it a significant area of interest and development in the field of artificial intelligence. ',
      color: '#FF0000',
      id: '2',
    },
    {
      title: 'Midterm Presentation',
      start: '2024-01-06T19:30',
      end: '2024-01-06T20:30',
      fileTitle: 'Drag and drop file for calendar',
      fileContent:
      'Adding files to a calendar event can help organize and store relevant documents, attachments, or notes associated with a specific date or event. ',
      color: '#00FF00',
      id: '3',
    },

    {
      title: 'Workshop  2',
      start: '2023-11-15T19:30',
      end: '2023-11-15T20:30',
      fileTitle: 'Machine Learning',
      fileContent:
        'Machine learning is a field of artificial intelligence where computers learn from data, and the MNIST database is a collection of handwritten digits used for image classification tasks.',
      color: '#0000FF',
      id: '4',
    },

    {
      title: 'Final Project Presentation',
      start: '2024-02-25T19:30',
      end: '2024-02-25T20:30',
      fileTitle: 'Drag and drop file for calendar',
      fileContent:
        'DevToys is a highly efficient tool to make the process of viewing files information simpler and easier.\n\nIt simplifies the task of searching and comparing content in your files when it enables drag-and-drop functionality. ',
      color: '#800080',
      id: '5',
    },
    {
      title: '9am Midterm Presentation-II',
      start: '2024-02-07T19:30',
      end: '2024-02-07T20:30',
      fileTitle: 'Drag and drop file for calendar',
      fileContent:
        'DevToys is a highly efficient tool to make the process of viewing files information simpler and easier.\n\nIt simplifies the task of searching and comparing content in your files when it enables drag-and-drop functionality. ',
      color: '#FFA500',
      id: '6',
    },
  ];

  /** Button event Listeners start */

  /** Preview Modal Buttons Event Listeners start */
  closePreviewModalButton.addEventListener('click', function () {
    eventPreviewModal.style.display = 'none';
    addEditEventModal.style.display = 'none';
  });

  editPreviewModalButton.addEventListener('click', function () {
    // open
    addEditEventModal.style.display = 'block';

    document.getElementById('addEditEventTitle').textContent = 'Edit Event';
    document.getElementById('eventTitle').value = calEvent.title;
    document.getElementById('eventDescription').value = calEvent.fileContent;
    document.getElementById('eventStart').value = calEvent.start ? moment(calEvent.start.toISOString()).format('YYYY-MM-DDTHH:mm') : '';
    document.getElementById('eventEnd').value = calEvent.end ? moment(calEvent.end.toISOString()).format('YYYY-MM-DDTHH:mm') : '';
    document.getElementById('eventTitle').readOnly = true;

    document.getElementById('eventDescription').readOnly = false;
    document.getElementById('eventStart').readOnly = false;
    document.getElementById('eventEnd').readOnly = false;

    deleteEventModalButton.style.display = 'block';
    saveEventModalButton.style.display = 'block';
  });

  deletePreviewModalButton.addEventListener('click', function () {
    if (calEvent) {
      $('#calendar').fullCalendar('removeEvents', calEvent.id);
      $('#smallCalendar').fullCalendar('removeEvents', calEvent.id);
      eventPreviewModal.style.display = 'none';
      addEditEventModal.style.display = 'none';
    }
  });
  /** Preview Modal Buttons Event Listeners end */

  /** Add Event Modal Buttons Event Listeners start */
  deleteEventModalButton.addEventListener('click', function () {
    if (calEvent) {
      $('#calendar').fullCalendar('removeEvents', calEvent.id);
      $('#smallCalendar').fullCalendar('removeEvents', calEvent.id);
      eventPreviewModal.style.display = 'none';
      addEditEventModal.style.display = 'none';
    }
  });

  saveEventModalButton.addEventListener('click', function () {
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventStart = document.getElementById('eventStart').value;
    const eventEnd = document.getElementById('eventEnd').value;

    if (isNewEvent) {
      const newEvent = {
        id: generateUniqueEventId(),
        title: eventTitle,
        fileContent: eventDescription,
        start: eventStart,
        end: eventEnd,
        color: '#008000',
      };
      $('#calendar').fullCalendar('renderEvent', newEvent, true);
      $('#smallCalendar').fullCalendar('renderEvent', newEvent, true);
    } else {
      calEvent.title = eventTitle;
      calEvent.fileContent = eventDescription;
      calEvent.start = eventStart;
      calEvent.end = eventEnd;
      $('#calendar').fullCalendar('updateEvent', calEvent);
      const scEvent = getEventByCustomId('#smallCalendar', calEvent.id);
      if (scEvent) {
        scEvent.title = eventTitle;
        scEvent.fileContent = eventDescription;
        scEvent.start = eventStart;
        scEvent.end = eventEnd;
        $('#smallCalendar').fullCalendar('updateEvent', scEvent);
      }
    }
    addEditEventModal.style.display = 'none';
  });

  closeEventModalButton.addEventListener('click', function () {
    eventPreviewModal.style.display = 'none';
    addEditEventModal.style.display = 'none';
  });

  /** Add Event Modal Buttons Event Listeners end */

  /** Small calendar Working start */
  $('#smallCalendar').fullCalendar({
    header: {
      right: 'title',
      left: 'prev,next',
    },
    defaultDate: '2024-04-04',
    navLinks: true,
    editable: false,
    eventLimit: true,
    events: calenderEvents,
  });
  /** Small calendar Working end */

  /** Main Calendar working start */
  $('#calendar').fullCalendar({
    header: {
      right: 'prev,next today',
      center: 'title',
      left: 'month,basicWeek,basicDay',
    },
    defaultDate: '2024-04-04',
    navLinks: true,
    editable: true,
    droppable: true,
    eventLimit: true,
    events: calenderEvents,

    eventRender: function (event, element) {
      const today = moment().startOf('day');
      const eventTime = moment(event.start);
      if (eventTime.isBefore(today)) {
        element.css('background-color', '#d3d3d3'); // Gray color for past events
      }
    },

    eventClick: function (event, jsEvent, view) {
      isNewEvent = false;
      calEvent = event;

      const fileTitle = document.getElementById('fileTitle');
      fileTitle.textContent = 'Title: ' + calEvent.title;
      const fileContent = document.getElementById('fileContent');
      fileContent.textContent = calEvent.fileContent;

      eventPreviewModal.style.display = 'block';
      addEditEventModal.style.display = 'none';

      document.getElementById('addEditEventTitle').textContent = '';
      document.getElementById('eventTitle').value = calEvent.title;
      document.getElementById('eventDescription').value = calEvent.fileContent;
      document.getElementById('eventStart').value = calEvent.start ? moment(calEvent.start.toISOString()).format('YYYY-MM-DDTHH:mm') : '';
      document.getElementById('eventEnd').value = calEvent.end ? moment(calEvent.end.toISOString()).format('YYYY-MM-DDTHH:mm') : '';
      document.getElementById('eventTitle').readOnly = true; // Disable editing for existing events
      document.getElementById('eventDescription').readOnly = true; // Disable editing for existing events
      document.getElementById('eventStart').readOnly = true; // Disable editing for existing events
      document.getElementById('eventEnd').readOnly = true; // Disable editing for existing events

      deleteEventModalButton.style.display = 'block';
      editPreviewModalButton.style.display = 'block';
    },

    dayClick: function (date, jsEvent, view) {
      isNewEvent = true;

      addEditEventModal.style.display = 'block';

      document.getElementById('addEditEventTitle').textContent = 'Add Event';
      document.getElementById('eventTitle').value = '';
      document.getElementById('eventDescription').value = '';
      document.getElementById('eventStart').value = moment(date.toISOString()).format('YYYY-MM-DDTHH:mm');
      document.getElementById('eventEnd').value = moment(date.toISOString()).format('YYYY-MM-DDTHH:mm');
      document.getElementById('eventTitle').readOnly = false; // Enable editing for new events
      document.getElementById('eventDescription').readOnly = false; // Enable editing for new events
      document.getElementById('eventStart').readOnly = false; // Enable editing for new events
      document.getElementById('eventEnd').readOnly = false; // Enable editing for new events

      deleteEventModalButton.style.display = 'none';
      editPreviewModalButton.style.display = 'block';
      saveEventModalButton.style.display = 'block';
    },

    eventDrop: function (event) {
      const scEvent = getEventByCustomId('#smallCalendar', event.id);
      if (scEvent) {
        scEvent.start = event.start;
        scEvent.end = event.end;
        $('#smallCalendar').fullCalendar('updateEvent', scEvent);
      }
    },

    drop: function () {
      if ($('#drop-remove').is(':checked')) {
        $(this).remove();
      }
    },

    eventReceive: function (event) {
      $('#smallCalendar').fullCalendar('renderEvent', event, true);
    },
  });

  

  /** Main Calendar working end */

  /** External Events */
  $('#external-events .fc-event').each(function () {
    $(this).data('event', {
      id: generateUniqueEventId(),
      title: $.trim($(this).text()),
      fileTitle: 'Drag and drop file for calendar',
      fileContent: 'About the meeting.',
      color: '#800080',
      stick: true,
    });

    $(this).draggable({
      zIndex: 999,
      revert: true,
      revertDuration: 0,
    });
  });
});
/** External Event End */

/** Helping Methods */
function generateUniqueEventId() {
  const timestamp = new Date().getTime();
  const randomSuffix = Math.floor(Math.random() * 1000);

  return `event_${timestamp}_${randomSuffix}`;
}

function getEventByCustomId(elementSelector, customId) {
  const allEvent = $(elementSelector).fullCalendar('clientEvents');
  for (eventObj of allEvent) {
    if (eventObj.id === customId) {
      return eventObj;
    }
  }
  return null;
}
/** Helping Methods End */

$(document).ready(function() {
  // Initialize FullCalendar
  $('#calendar').fullCalendar({
    // Your FullCalendar options...
  });

  // Initialize draggable events
  $('#external-events .fc-event').each(function() {
    $(this).data('event', {
      title: $.trim($(this).text()),
      stick: true
    });

    $(this).draggable({
      zIndex: 999,
      revert: true,
      revertDuration: 0
    });
  });

  // Event listener for the "Generate Events" button
  $("#generateEvents").on("click", function() {
    var title = $("#eventTitle").val();
    var description = $("#eventDescription").val();
    var start = $("#eventStart").val();
    var end = $("#eventEnd").val();

    // Loop through each checkbox to check if it's selected
    $("#dayCheckboxes input[type='checkbox']").each(function() {
      if ($(this).is(":checked")) {
        var dayOfWeek = parseInt($(this).val());

        // Calculate the start date based on the selected day of the week
        var startDate = moment(start).isoWeekday(dayOfWeek);

        // Calculate the end date based on the selected day of the week
        var endDate = moment(end).isoWeekday(dayOfWeek);

        // Add event to the calendar
        $("#calendar").fullCalendar("renderEvent", {
          title: title,
          description: description,
          start: startDate,
          end: endDate,
          allDay: false // Assuming events are not all-day events
        });

        // Make the newly added event draggable
        $('#calendar .fc-event').last().draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0
        });

        
      }
    });

    // Close the modal or perform any other action as needed
    // Example: $("#addEditEventModal").modal("hide");

    
  });
});

