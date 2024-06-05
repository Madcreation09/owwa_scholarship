const image = "/img/icon.jpg";

const handleFetchOrder = async () => {
    const response = await fetch('http://localhost:4000/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    return data; // Return the length of the fetched data
  };

export const orders = [
    {
      img: image,
      name: "John Michael",
      email: "john@creative-tim.com",
      job: ["Manager", "Organization"],
      online: true,
      date: "23/04/18",
    },
    {
      img: "/img/icon.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: ["Programator", "Developer"],
      online: false,
      date: "11/01/19",
    },
    {
      img: "/img/team-4.jpeg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: ["Executive", "Projects"],
      online: true,
      date: "19/09/17",
    },
    {
      img: "/img/team-3.jpeg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: ["Programator", "Developer"],
      online: true,
      date: "24/12/08",
    },
    {
      img: "/img/bruce-mars.jpeg",
      name: "Bruce Mars",
      email: "bruce@creative-tim.com",
      job: ["Manager", "Executive"],
      online: false,
      date: "04/10/21",
    },
    {
      img: "/img/team-2.jpeg",
      name: "Alexander",
      email: "alexander@creative-tim.com",
      job: ["Programator", "Developer"],
      online: false,
      date: "14/09/20",
    },
  ];
  
  export default orders;
  