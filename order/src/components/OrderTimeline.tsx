import React from 'react';
import { Order, dateFormatter } from 'frontend-common';

interface OrderTimelineProps {
  order: Order;
}

interface TimelineEvent {
  status: Order['status'];
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  const getTimelineEvents = (order: Order): TimelineEvent[] => {
    const events: TimelineEvent[] = [
      {
        status: 'pending',
        label: 'Order Placed',
        date: order.createdAt,
        completed: true,
        current: false,
      },
      {
        status: 'processing',
        label: 'Processing',
        date: order.updatedAt,
        completed: false,
        current: false,
      },
      {
        status: 'shipped',
        label: 'Shipped',
        date: '',
        completed: false,
        current: false,
      },
      {
        status: 'delivered',
        label: 'Delivered',
        date: '',
        completed: false,
        current: false,
      },
    ];

    // Update completion status based on current order status
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStatusIndex = statusOrder.indexOf(order.status);
    
    events.forEach((event, index) => {
      if (index < currentStatusIndex) {
        event.completed = true;
      } else if (index === currentStatusIndex) {
        event.current = true;
        event.completed = true;
        if (event.status !== 'pending') {
          event.date = order.updatedAt;
        }
      }
    });

    // Handle cancelled status
    if (order.status === 'cancelled') {
      return [
        {
          status: 'pending',
          label: 'Order Placed',
          date: order.createdAt,
          completed: true,
          current: false,
        },
        {
          status: 'cancelled',
          label: 'Order Cancelled',
          date: order.updatedAt,
          completed: true,
          current: true,
        },
      ];
    }

    return events;
  };

  const events = getTimelineEvents(order);

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.status}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                    event.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      event.completed
                        ? event.current
                          ? 'bg-green-500'
                          : 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {event.completed ? (
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div className="h-2.5 w-2.5 bg-gray-400 rounded-full" />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        event.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {event.label}
                      {event.current && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {event.date && (
                      <time dateTime={event.date}>
                        {dateFormatter(event.date, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
