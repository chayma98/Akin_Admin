import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChefModule } from './chef/chef.module';
import { ClientModule } from './client/client.module';
import { CommandeModule } from './commande/commande.module';
import { MessageModule } from './message/message.module';
import { AccessModule } from './access/access.module';
import { ArticleModule } from './article/article.module'; 
import { AuthGuard } from './auth.guard';
import { ProfilComponent } from './profil/profil.component';
import { PremiumModule } from './premium/premium.module'; 

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate:[AuthGuard],  children: [
      { path: 'profile', component: ProfilComponent },
      { path: 'client', loadChildren: './client/client.module#ClientModule' },
      { path: 'chef', loadChildren: './chef/chef.module#ChefModule' },
      { path: 'article', loadChildren: './article/article.module#ArticleModule' },
      { path: 'commande', loadChildren: './commande/commande.module#CommandeModule' },
      { path: 'message', loadChildren: './message/message.module#MessageModule' },
      { path: 'access', loadChildren: './access/access.module#AccessModule' },
      { path: 'premium', loadChildren: './premium/premium.module#PremiumModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
