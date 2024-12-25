
import { collection, getDocs} from 'firebase/firestore';
import { db } from "../firebase"
import { useState, useEffect } from 'react';
const ReviewForCard=({userId})=>{
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchFeedback=async ()=>{
            try{
                const feedback=collection(db,"Feedback",)
                console.log(feedback)
                const feedbackSnapshot = await getDocs(feedback);
                setLoading(false);
                if (!feedbackSnapshot.empty) {
                    const feedbackData = feedbackSnapshot.docs.map(doc => doc.data());
                    setFeedbackData(feedbackData) ;
                    console.log(feedbackData)
                }
                else{
                    console.log('No feedback found for this profile');
                }
            }catch(error){
                console.error('Error fetching profile feedback:', error);
                setFeedbackData([]) ;
                setLoading(false);
            }
        }
        fetchFeedback()
    },[userId])
    if (loading) return <div>Loading...</div>;
    return(
        <div> {feedbackData.length > 0 ? 
            ( feedbackData.map((feedback) => ( <div key={feedback.id}> <h4>Feedback from User: {feedback.userid}</h4>
             {feedback.feedbackItems?.length > 0 ? 
             ( feedback.feedbackItems.map((item, index) => ( <div key={`${feedback.id}-${index}`}> 
             <p>Comment: {item.comment}</p> 
             <p>Rating: {item.rating}</p> 
             <p>User ID: {item.userId}</p> </div> )) ) :
              ( <p>No feedback items available.</p> )} </div> )) ) :
               ( <p>No feedback available.</p> )} </div>)
}
export default ReviewForCard