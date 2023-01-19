FireBase是一個雲端資料庫，數據類型屬於noSQL

在使用上，需先在[FireBase](https://firebase.google.com/)網站中建立資料庫專案來儲存資料 : 

1. go to console >> 建立新專案
2. 建立專案名稱 (ex : test-data-danilo)

# 設定Google Fire Base環境

---

為了讓專案可以使用Google FireBase的API，需要先在專案中install firebase library

```bash
$ npm add firebase
```

> 習慣在專案中建立firebase.js檔案，放置跟使用Fire Base API有關的編碼
> 

firbase中包含許多library提供我們不同的功能，例如 app, auth, firestore….等，在設定環境時，需使用到app library

**什麼是firebase/app** : “firebase/app”是firebase中的app library ，包含運行Firebase所需的所有內容(包括internal service)

為了使用Firebase的SDK(Software Development Kit)，需要從firebase/app 中 import “initializeApp”

**什麼是initializeApp** : initializeApp會根據該函式創立一個app instance，我們須透過initializeApp在js中搭建連結firebase專案(test-data-danilo)的online instance。換句話說，**透過initializeApp，我們可以在js檔案中連結firebase雲端數據庫**

```jsx
// in firebase.js
import {initializeApp} from "firebase/app"
```

## 給予initailizeApp所需要的參數設定，連結指定專案的雲端數據庫 :

1. 前往firebase專案總覽 >> 新增/建立應用程式 >> 選擇web app icon
2. 註冊應用程式後，firebase會生成initializeApp所需的配置(Config)，將該配置的內容複製到js檔案中，即可成功將js連結到firebase指定專案中的雲端資料庫
    
    ```jsx
    // in firebase.js
    import {initializeApp} from "firebase/app"
    
    const firebaseConfig = {
        apiKey: "AIzaSyBOlpkruItVaqzyCt6CQ_yu-43KUaW_XEc",
        authDomain: "test-data-daniloh.firebaseapp.com",
        projectId: "test-data-daniloh",
        storageBucket: "test-data-daniloh.appspot.com",
        messagingSenderId: "817729309112",
        appId: "1:817729309112:web:573939b5a462751ea8674d"
      };
      
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    ```
    
    Config的作用 : 將Config傳遞給initializeApp後，initializeApp會透過專屬的Config參數搭建一個Firebase的SDK套件，這個套件將允許我們透過js的編碼，操作雲端資料庫上任何CRUD的動作。
    
    簡而言之，在js中設定Firebase虛擬軟體的初始化過程，我們需要firebase生成的Config，傳遞到initializeApp來建構完整的SDK，建構完後將其作為新變數”firebaseApp”/”app”，作為後續使用firebase Authentication, FireStore Data storage等功能的參數，讓firebase知道我們在使用的雲端資料庫使哪一個
    

# 使用Authentication功能
---

為了使用auth功能，需先從firebase/auth 中 import “getAuth” (代表添加Firebase Authentication JS SDK)

```jsx
// in firebase.js
import {getAuth} from "firebase/auth"
```

初始化驗證系統，並將回傳的內容作為reference的變數供後續驗證程序作為ref

```jsx
const auth = getAuth(firebaseApp)
```

# 使用Google Sign In Authentication

---

使用Google Sign In，首先需要使用firebase/auth中的GoogleAuthProvider建立一個新的provider instance作為web app抓取使用者的帳戶進行驗證的reference使用

```jsx
// in firebase.js
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();
```

設定讓用戶選擇自己的google account

```jsx
// in firebase.js
provider.setCustomParameters({prompt:"select_account"})
```

在Firebase網站中，活化Google登入的method

## 使用PopUp視窗方式登入

1. 從firebase/auth中import signInWithPopup，並給予”auth”跟”provider”，讓popup的視窗根據本firebase專案的auth以及設定好的Google登入之provider來執行登入程序
    
    > signInWithPopup 需要知道auth的對象來確定要連結的後端firbase專案，以及provider的配置，來決定登入的方式(FB, Ins, Git, Google…)
    > 
    
    ```jsx
    // in firebase.js
    import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
    //Auth
    //取用環境設定步驟中建立的firebaseApp作為ref
    const auth = getAuth(firebaseApp)
    //procider Config
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:"select_account"})
    
    export const googleSignInWithPopUp = () => signInWithPopup(auth, provider)
    ```
    
2. 在Component中使用googleSignInWithPopUp
    
    ```jsx
    // in sign-in-form.component.jsx
    import { googleSignInWithPopUp } from "../utils/firebase/firebase.util"
    
    const SignInForm = () => {
        const logInWithGoogle = async() => {
            const res = await googleSignInWithPopUp();
            console.log(res)
        }
        return (
            <>
                <h1>I am form</h1>
                <button onClick={logInWithGoogle}>Sign In with Google Account</button>
            </>
    
        )
    }
    export default SignInForm
    ```
    

# 設定FireStore環境儲存數據

---

1. Firebase web >> go to console >> 選擇專案 >> Firestore Database >> 建立資料庫>>以正式版模式啟動>>選擇地理區域(隨意)
2. 在規則中，為了使專案JS檔案Access到Firebase時允許編輯雲端資料庫，將權限從false改成true
    

    

## 初始化FireStore環境

為了連結FireStore數據，需要使用firebase/firestore SDK，並需要使用”getFirestore”, “doc”

> getFirestore : 初始化firestore 的method，導入Config後的firebaseApp，並將回傳的內容作為reference的變數供後續驗證程序作為ref
> 

> doc : 取用firebase專案中的數據document
> 

> getDoc : 取用document中的data
> 

> setDoc : 設定document中的data
> 

```jsx
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"
//db, 初始化firestore使JS專案可以access firestore data
//取用環境設定步驟中建立的firebaseApp作為ref
export const db = getFirestore(firebaseApp)
```

## 將authentication登入後的資訊儲存到Firestore

在firestore中新增collection以及document，並將用戶資訊儲存到其中 :

```jsx
export const creatUserDocumentFromAuth = async(userAuth)=>{
    const userDocRef = doc(db, "users", userAuth.uid)
}
```

> userAuth是googleSignInWithPopUp()回傳的object，內容包含user的細節資訊
> 

> doc需要接收3個變數 : firestore專案位置(db), collection名稱, document的unique id, 作為鎖定數據對象的referenct，將其儲存為userDocRef的變數，代表鎖定db位置(firebase指定專案)、collection位置以及數據本身的識別(本例子為uid)
> 

透過getDoc，實際從userDocRef的鎖定位置中，抓出數據位置

```jsx
export const creatUserDocumentFromAuth = async(userAuth)=>{
    const userDocRef = doc(db, "users", userAuth.uid)
		const userSnapShot = getDoc(userDocRef)
}
```

> 無論該筆數據在firestore中是否存在，getDoc都會根據傳入的userDocRef去生成一個虛擬位置來代表指定的db, collection以及uid數據的位置，通常會再使用 “.exists()”來確認該筆數據是否存在在firebase數據庫之中
> 

確認getDoc的內容是否真的存在於數據庫中，如果有的話就提取出來，如果沒有的話就透過setDoc在firebase中創造一筆新的數據

```jsx
export const creatUserDocumentFromAuth = async(userAuth)=>{
    const userDocRef = doc(db, "users", userAuth.uid)
    const userSnapShot = await getDoc(userDocRef);
		// 確認該筆數據是否已存在於firestore中
		// 如果沒有
    if(!userSnapShot.exists()){
				// 從userAuth中提取 displatName, email, imgurl
        const {displayName, email} = userAuth;
        const imgurl = userAuth.providerData[0].photoURL;
				// 生成創建數據的日期
        const createAt = new Date();
        try {
				// 透過setDoc, 生成指定數據到指定的userDocRef位置中
            await setDoc(userDocRef,{
                displayName,
                email,
                imgurl,
                createAt
            });
        } catch(e){
            console.log(e)
        }
    }
		// 如果數據已存在於firestore中
		// 直接回傳userDocRef位置
    return userDocRef
}
```
