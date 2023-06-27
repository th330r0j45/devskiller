import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export const OTHER_ORIGIN = 'Other, specify';

@Injectable({
  providedIn: 'root'
})
export class OriginsService {
  public origins = of(['Facebook', 'Reddit', 'Friend', 'Ad', OTHER_ORIGIN]);
}
