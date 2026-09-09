import { Controller, Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

interface SseEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('events')
export class EventsController {
  @Sse('realtime-score')
  scoreStream(): Observable<SseEvent> {
    // Streams a simulated carbon trajectory update using RxJS interval
    return interval(4000).pipe(
      map((_) => {
        const fluctuation = Math.random() * 0.4 - 0.2;
        return {
          data: {
            scoreDelta: fluctuation,
          },
        };
      }),
    );
  }
}
