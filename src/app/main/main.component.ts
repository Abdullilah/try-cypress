import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MainService} from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public showMessage = false;
  public userInfo: {
    name: string;
    surname: string;
    points: number;
  };
  public message: {
    title: string;
    text: string;
  };

  constructor(
    private readonly mainService: MainService,
  ) {}

  ngOnInit(): void {
    this.userInfo = this.mainService.get();
  }

  public showMessageSection(): void {
    this.showMessage = true;
  }

  public sendMessage(e): void {
    e.preventDefault();

    this.message = {
      title: document.querySelector('#messageTitle')?.value,
      text: document.querySelector('#messageText')?.value,
    };
  }

  public clearMessage(): void {
    this.message = {
      title: '',
      text: '',
    };
    document.querySelector('#messageTitle')?.value = '';
    document.querySelector('#messageText')?.value = '';
  }
}
