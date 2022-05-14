import { useState, useEffect } from "react";
import apiTool from "./api/apiTool";
import "./theme/styles.scss";

export default function App() {
  const [allPostRequest, setAllPostRequest] = useState<Array>(null);
  const [datosForm, setDatosForm] = useState<object>({
    userId: 1,
    id: "",
    title: "",
    body: ""
  });
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    apiTool
      .getAllPosts()
      .then((res: any) => setAllPostRequest(res.data.reverse().slice(0, 100)))
      .catch((_error: any) => setAllPostRequest([null]));
  }, []);

  // const handleGetPostByID = (id: number) => {
  //   // apiTool
  //   //   .getOnePost(id)
  //   //   .then((res: any) => {
  //   //     setPostRequest([res.data]);
  //   //   })
  //   //   .catch((_error: any) => setPostRequest([null]));
  // };

  const handleDeletePostByID = (id: number) => {
    setAllPostRequest(allPostRequest.filter((post: object) => post.id !== id));
    console.log(allPostRequest);
    // apiTool
    //   .deleteOnePost(id)
    //   .then((res: any) => {})
    //   .catch((_error: any) => {});
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setDatosForm({
      ...datosForm,
      id: allPostRequest.length + 1,
      [event.target.name]: event.target.value
    });
    if (datosForm.title && datosForm.body) setFormFilled(true);
    console.log(datosForm);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setAllPostRequest([datosForm, ...allPostRequest]);
    document?.getElementById("submit-form")?.reset();
    setDatosForm({
      userId: 1,
      id: "",
      title: "",
      body: ""
    });
    setFormFilled(false);
    // apiTool
    //   .createPost(datosForm)
    //   .then((res: object) => {
    //     setPostRequest(datosForm);
    //   })
    //   .catch((_error: any) => setPostRequest(null));
    // console.log("send", postRequest);
  };

  return (
    <div className="App">
      <div className="App__title">
        <h1>ReactJS + TS test</h1>
        <h4>Óscar Abad · 14/05/2022</h4>
      </div>
      <div className="wrapper">
        <div className="posts__submit-form">
          <form id="submit-form" onSubmit={handleOnSubmit}>
            <input
              onChange={handleInputChange}
              placeholder="Title"
              type="text"
              name="title"
            />
            <textarea
              onChange={handleInputChange}
              placeholder="Message"
              name="body"
            />
            {!formFilled && <span>Fill the form before post</span>}
            {formFilled && (
              <button type="submit" value="Save">
                Post it!
              </button>
            )}
          </form>
          {/* <Form /> */}
        </div>
        <div className="posts__container">
          <ul>
            {allPostRequest &&
              allPostRequest.map((post: object) => (
                <li key={post.id}>
                  <div className="posts__post-header">
                    <h1>{post.id}</h1>
                    <div>
                      <button onClick={() => handleDeletePostByID(post.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
