import Realm from "realm";

const app = new Realm.App({ id: "mongo-to-electron-jzutigk" }); // create a new instance of the Realm.App
export async function run() {
    // login with an anonymous credential
    await app.logIn(Realm.Credentials.anonymous());
    const DogSchema = {
        name: "Dog",
        properties: {
            _id: "int",
            name: "string",
            age: "int",
        },
        primaryKey: "_id",
    };
    const realm = await Realm.open({
        schema: [DogSchema],
        sync: {
            user: app.currentUser,
            partitionValue: "myPartition",
        },
    });
    // The myPartition realm is now synced to the device. You can
    // access it through the `realm` object returned by `Realm.open()`
    // write to the realm
    const dogs = realm.objects("Dog");
    console.log(`Renderer: Number of Dog objects: ${dogs.length}`);

    realm.write(() => {
        realm.create("Dog", {
            _id: 1,
            name: "Spot",
            age: 2,
        });
    });
}
