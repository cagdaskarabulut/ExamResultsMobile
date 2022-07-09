import React, { useState, useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import { Card, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button, View, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth'

const HomeScreenTeacher = ({navigation}) => {
    const [students, setStudents] = useState([])

    const fetchStudents = async () => {
        const studentsCollection = await firestore().collection('students').get()
        console.log(studentsCollection.docs)
        setStudents(
            studentsCollection.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            })
        )
    }

    const signOut = async function () {
        return await auth().signOut()
          .then(async () => {
          });
      };

    const deleteStudent = async (id) => {
        const res = await firestore().collection('students').doc(id).delete()
        console.log(res)
        fetchStudents()
    }

    useEffect(() => {
        firestore().collection('students').where("type", "==", "student").onSnapshot({
            error: (e) => console.error(e),
            next: (querySnapshot) => {
            querySnapshot.docChanges().forEach(change => {
                if(change.type == 'added') {
                    console.log('New student:', change.doc.data())
                }
                if(change.type == 'modified') {
                    console.log('Modified student:', change.doc.data())
                }
                if(change.type == 'removed') {
                    console.log('Removed student:', change.doc.data())
                }
                fetchStudents()
            })
        }})
    }, [])
    return (
        <View>
            <Header 
            placement='center'
            centerComponent={{text: 'ÖĞRENCİLER', style:{color: '#fff', marginTop: 2}}}
            //leftComponent={{icon: 'iconImage', color: '#fff'}}
            //leftComponent={<Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }} />}
            rightComponent={<Button  title="Çıkış" onPress={() => signOut()} />}>
            </Header>
            <ScrollView>
                {
                    students.map(student => {
                        return (
                            <Card key={student.id}>
                                <Card.Title style={{fontSize: 21, color: 'red'}}>{student.name}</Card.Title>
                                <Card.Divider />
                                <Card.Title>{student.age} years old {student.department} student, studying
                                at {student.school}
                                </Card.Title>
                                <Card.Divider />
                                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon 
                                    name='pencil'
                                    color={'blue'}
                                    size={20}
                                    onPress={() => {navigation.navigate('Update', {
                                        studentToUpdate: student
                                    })}}
                                    />
                                    <Icon 
                                    name='trash'
                                    color={'red'}
                                    size={20}
                                    onPress={() => {deleteStudent(student.id)}}
                                    />
                                </View>
                            </Card>
                            )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default HomeScreenTeacher