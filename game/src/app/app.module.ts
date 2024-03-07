import { NgModule } from '@angular/core';
import { AppComponent } from '~/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '~/app/app.routes';
import { SidebarComponent } from '~/app/hoc/sidebar/sidebar.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrap0CircleFill, bootstrapCardChecklist, bootstrapHouse } from '@ng-icons/bootstrap-icons';
import { WelcomeComponent } from '~/app/hoc/welcome/welcome.component';
import { GameModule } from '~/app/hoc/game/game.module';
import { GameStatsComponent } from '~/app/hoc/game-stats/game-stats.component';
import { CollapseComponent } from '~/app/components/collapse/collapse.component';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {}),
    NgIconsModule.withIcons({
      bootstrap0CircleFill,
      bootstrapCardChecklist,
      bootstrapHouse
    }),
    SidebarComponent,
    WelcomeComponent,
    GameModule,
    GameStatsComponent,
    CollapseComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
