import Homecard from './components/Homecard'
import Example from './components/Example'
import GetStart from './components/GetStart'
import NavBar from './components/NavBar'
import Form from './components/Form'
import MapResalt from './components/MapResalt'
import SelectedTrip from './components/SelectedTrip'

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="flex flex-row">
        <div className="basis-1/4 md:basis-1/5"></div>
        <div className="basis-1/4 md:basis-3/5">
          <Homecard />
          <GetStart />
          <Example />
          <Form />
          </div>
        <div className="basis-1/2 md:basis-1/5"></div>
      </div>
      <MapResalt />
      <SelectedTrip />
    </main>
  )
}
