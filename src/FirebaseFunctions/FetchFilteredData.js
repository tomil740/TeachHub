const fetchAndGroupByCategory = async () => {
  try {
    const userCollection = collection(db, "user");
    const querySnapshot = await getDocs(userCollection);

    const groupedData = {};
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const category = user.category;

      if (!groupedData[category]) {
        groupedData[category] = [];
      }

      groupedData[category].push({ id: doc.id, ...user });
    });

    console.log("Grouped Data:", groupedData);
    return groupedData;
  } catch (error) {
    console.error("Error fetching and grouping data: ", error);
  }
};

export default fetchAndGroupByCategory;
