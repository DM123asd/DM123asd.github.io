<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" encoding="utf-8" indent="yes"/>

<xsl:template match="/rss/channel">
  <html lang="zh-CN">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title><xsl:value-of select="title"/> — RSS</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f1729; color: #e2e8f0; padding: 2rem; max-width: 720px; margin: 0 auto; }
      h1 { font-size: 1.5rem; margin-bottom: 0.25rem; color: #60a5fa; }
      .desc { color: #94a3b8; font-size: 0.9rem; margin-bottom: 2rem; }
      .item { border: 1px solid #1e293b; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1rem; }
      .item h2 { font-size: 1.1rem; margin-bottom: 0.35rem; }
      .item h2 a { color: #e2e8f0; text-decoration: none; }
      .item h2 a:hover { color: #60a5fa; }
      .item .date { color: #64748b; font-size: 0.8rem; margin-bottom: 0.5rem; }
      .item .desc { color: #94a3b8; font-size: 0.85rem; line-height: 1.5; margin-bottom: 0; }
      .footer { margin-top: 2rem; font-size: 0.75rem; color: #475569; }
      .footer a { color: #60a5fa; }
    </style>
  </head>
  <body>
    <h1><xsl:value-of select="title"/></h1>
    <p class="desc"><xsl:value-of select="description"/></p>
    <xsl:for-each select="item">
      <div class="item">
        <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
        <p class="date"><xsl:value-of select="pubDate"/></p>
        <p class="desc"><xsl:value-of select="description"/></p>
      </div>
    </xsl:for-each>
    <p class="footer">
      RSS feed — <a href="{link}">订阅链接</a>
    </p>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
