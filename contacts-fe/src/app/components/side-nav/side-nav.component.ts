import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
