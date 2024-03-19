import Person from "./Person";
const Content = ({ persons, allPersons, deletePerson }) => {
  if (persons.length === 0) {
    return (
      <ul>
        {allPersons.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  }
};

export default Content;
