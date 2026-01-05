---
layout: default
title: Caccio's Blog
---

{% for post in site.posts %}
<div class="post-list-item">
  <small class="post-date">{{ post.date | date: "%-d %b %Y" }}</small>
  <h2 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
  <div class="post-excerpt">
    {{ post.excerpt }}
  </div>
  <br/>
  {% if post.categories and post.categories.size > 0 %}
  <div class="post-categories">
    Categories: 
      {% for cat in post.categories %}
        <span class="post-category">{{ cat }}</span>{% unless forloop.last %}, {% endunless %}
      {% endfor %}
  </div>
  {% endif %}
</div>
<br/>
<hr/>
{% endfor %}
