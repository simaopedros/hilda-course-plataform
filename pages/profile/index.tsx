import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"; // Import new functions
import SubscriptionDetails from "@/components/profile/SubscriptionDetails";
import UserProfile from "@/components/profile/UserProfile";
import User from "@/types/User";
import withAuth from "@/utils/withAuth";
import React, { useState } from "react";
import { firestore } from "@/data/firestore";
import { GetServerSidePropsContext } from "next";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [currentUser, setUser] = useState<User>(user); // Adicione este estado



  const handleUpdateProfile = async (updatedUser: User) => {
    const q = query(collection(firestore, 'profiles'), where('UID', '==', user.UID));
    const querySnapshot = await getDocs(q);

    // Se não encontrarmos um documento correspondente, paramos aqui.
    if (querySnapshot.empty) {
      console.error("Não foi encontrado nenhum documento com o UID especificado.");
      return;
    }

    // Como estamos buscando com '==', teremos apenas um resultado.
    const userDoc = querySnapshot.docs[0];
    
    try {
      await updateDoc(userDoc.ref, {
        name: updatedUser.name,
        description: updatedUser.description,
      });

      // Atualizar o estado local
      setUser(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar o perfil: ", error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Perfil</h1>
      <UserProfile user={user} onSubmit={handleUpdateProfile} />
      <SubscriptionDetails user={user} />{" "}
      {/* Adicione o novo componente aqui */}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userUID = context.query.user;

  // Fetch user data from Firestore
  const querys = query(collection(firestore, 'profiles'), where('UID', '==', userUID));
  const querySnapshot = await getDocs(querys);
  
  if (querySnapshot.empty) {
    // Handle case where no user document exists
    return {
      notFound: true,
    };
  }

  // Since we are querying with '==', we will only have one result
  const userDocSnap = querySnapshot.docs[0];
  let userData: any = userDocSnap.data();

  // Convert the Date object to a serializable format
  if(userData.createdAt) {
    userData.createdAt = userData.createdAt.toDate.toString()
  }
  if(userData.updatedAt) {
    userData.updatedAt = userData.updatedAt.toDate.toString()
  }

  return {
    props: {
      user: userData,
    },
  };
}



export default withAuth(Profile);
