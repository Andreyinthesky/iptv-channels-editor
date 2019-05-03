namespace M3UPlaylistParser
{
    internal enum ParsePlaylistItemInfoState
    {
        Idle,
        ParseDuration,
        ParseAttributeName,
        ParseTitle,
        ParseAttributeValue,
    }
}