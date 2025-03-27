import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { NgIf } from '@angular/common'
import { AtualizacaoComponent } from '../atualizacao/atualizacao.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
    DashboardComponent,
    AtualizacaoComponent,
    NgIf 
  ],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
