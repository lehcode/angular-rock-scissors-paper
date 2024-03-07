import { NgModule } from '@angular/core';
import { AppComponent } from '~/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '~/app/app.routes';
import { SidebarComponent } from '~/app/sidebar/sidebar.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrap0CircleFill, bootstrapCardChecklist } from '@ng-icons/bootstrap-icons';
import { WelcomeComponent } from '~/app/welcome/welcome.component';
import { GameModule } from '~/app/game/game.module';
import { GameStatsComponent } from '~/app/game-stats/game-stats.component';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {}),
    NgIconsModule.withIcons({
      bootstrap0CircleFill,
      bootstrapCardChecklist
    }),
    SidebarComponent,
    WelcomeComponent,
    GameModule,
    GameStatsComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
