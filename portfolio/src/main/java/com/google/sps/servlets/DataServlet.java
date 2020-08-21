// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private class UserComment {
    String message;
    String userEmail;
    
    UserComment(String message, String userEmail) {
      this.message = message;
      this.userEmail = userEmail;
    }    

    public String getMessage() {
      return message;
    }
    
    public String getUserEmail() {
      return userEmail;
    }
  }
  
  private ArrayList<UserComment> messages;

  @Override
  public void init() {
    messages = new ArrayList<UserComment>();
    Query query = new Query("comment");
    PreparedQuery results = DatastoreServiceFactory.getDatastoreService().prepare(query);
    for (Entity entity : results.asIterable()) {
      String message = (String)entity.getProperty("message");
      String email = (String)entity.getProperty("email");
      UserComment comment = new UserComment(message, email);
      messages.add(comment);
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    response.getWriter().println(gson.toJson(messages));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    messages.add(new UserComment(getUserMessage(request), getUserEmail()));
    
    Entity commentEntity = new Entity("comment");
    commentEntity.setProperty("message", getUserMessage(request));
    commentEntity.setProperty("email", getUserEmail());
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);
    response.sendRedirect("/index.html");
  }

  private String getUserMessage(HttpServletRequest request) {
    return request.getParameter("comment-field");
  }

  private String getUserEmail() {
    UserService userService = UserServiceFactory.getUserService();
    return userService.getCurrentUser().getEmail();
  }
}
