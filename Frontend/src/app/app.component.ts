import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
class AppComponent {
  title = 'DetailTEC'
}

const apiURL = 'http://localhost:5064'

export default AppComponent
export { AppComponent, apiURL }
