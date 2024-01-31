import MeetupList from "@/components/meetups/MeetupList";


const DUMMY_MEETUP_DATA = [
  {
    id:'m1',
    title:'A First  Meetup',
    image:'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg',
    address:'Some address',
    description:'This is first meetup',
  },
  {
    id:'m2',
    title:'A Second  Meetup',
    image:'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg',
    address:'Some address',
    description:'This is second meetup',
  },
  {
    id:'m3',
    title:'A Third  Meetup',
    image:'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg',
    address:'Some address',
    description:'This is third meetup',
  }
]

function HomePage(){
    return  <MeetupList meetups={DUMMY_MEETUP_DATA} />
  }
  export default HomePage;
  
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return {
//     props:{
//       meetups:DUMMY_MEETUP_DATA
//     }
//   }
// }


export async function getStaticProps (){
    
  const client = await MongoClient.connect(
    "mongodb+srv://mayankvaidya097:oJ6cxgSayX54WHzY@cluster0.roilqpl.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray()

  client.close()
    return {
      props: {
        meetups:meetups.map(meetup=>({
            title:meetup.title,
            address:meetup.address,
            image:meetup.image,
            id:meetup._id.toString,
          }))
      },
      revalidate:1
    }
  }